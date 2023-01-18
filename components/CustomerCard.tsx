import { useNavigation } from "@react-navigation/native";
import { Card, Icon } from "@rneui/themed";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { CustomersScreenNavigationProp } from "../screens/CustomersScreen";

type CustomerCardProps = {
  email: string;
  name: string;
  userId: string;
};

const CustomerCard = ({ email, name, userId }: CustomerCardProps) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const tailwind = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MyModal", { name, userId })}
    >
      <Card containerStyle={tailwind("p-5 rounded-lg")}>
        <View>
          <View style={tailwind("flex-row justify-between")}>
            <View>
              <Text style={tailwind("text-2xl font-bold")}>{name}</Text>
              <Text style={[tailwind("text-sm"), { color: "#59C1CC" }]}>
                ID: {userId}
              </Text>
            </View>
          </View>

          <View style={tailwind("flex-row items-center justify-end")}>
            <Text style={{ color: "#59C1CC" }}>
              {loading ? "loading..." : `${orders.length} x`}
            </Text>
            <Icon
              style={tailwind("mb-5 ml-auto")}
              name="box"
              type="entypo"
              color="#59C1CC"
              size={50}
            />
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
