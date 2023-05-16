import { View, Text } from "react-native";
import React from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { firebase } from "../firebaseConfig";

const Task = (props) => {
  return (
    <View className="flex-row bg-[#00ADB5] p-6 rounded-2xl mt-6">
      <Text className="text-2xl font-bold  text-white flex-1">
        {props.title}
      </Text>

      <View className="flex-row space-x-4 items-center">
        <Checkbox
          className="p-3 rounded-full"
          value={props.status}
          onValueChange={() => {
            firebase
              .firestore()
              .collection("tasks")
              .doc(props.id)
              .update("status", !props.status);
            props.reloadData();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            firebase.firestore().collection("tasks").doc(props.id).delete();
            props.reloadData();
          }}
        >
          <XMarkIcon size={30} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Task;
