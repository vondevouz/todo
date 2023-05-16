import { View, Text } from "react-native";
import React from "react";
import Task from "./Task";
import { ScrollView } from "react-native";

const TaskList = (props) => {
  if (props.tasks.length >= 1) {
    return (
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="mt-20 mx-8 bg-gray flex-1"
      >
        {props.tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            date={task.date}
            reloadData={props.reloadData}
          />

          ))}
          </ScrollView>
        );
      } else {
        return (
          <View className="flex-row items-center m-auto pb-32">
            <Text className="text-6xl font-bold text-white mx-auto text-center">
              Empty. {"\n"}
              Add something.
            </Text>
          </View>
        );
      }
    };
    
    export default TaskList;
    
    
    