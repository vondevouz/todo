import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../modules/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../firebaseConfig";
import * as Progress from "react-native-progress";
import TaskList from "../modules/TaskList";
import FloatingAddButton from "../modules/FloatingAddButton";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TextInput } from "react-native";

const HomeScreen = () => {
  const todoRef = firebase.firestore().collection("tasks");
  const [Loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  //Get firebase data
  const getFirebaseData = () => {
    setLoading(true);
    todoRef
      .orderBy("date")
      .get()
      .then((tasks) => {
        if (tasks.size == 0) {
          setTasks([]);
          setLoading(false);
        }
        const getTaskFromFirebase = [];
        tasks.docs.forEach((task) => {
          getTaskFromFirebase.push({ ...task.data(), id: task.id });
          setTasks(getTaskFromFirebase);
        });
        setLoading(false);
      });
  };
  //Runs on app run
  useEffect(() => {
    getFirebaseData();
  }, []);

  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            offset.value,
            (options = { stiffness: 100, mass: 0.5 })
          ),
        },
      ],
    };
  });
  return (
    <View className="bg-[#222831] w-full h-full text-white">
      <SafeAreaView class="flex-1">
        <Header title="To Do" />
      </SafeAreaView>

      {!Loading ? (
        <Animated.View
          style={[animatedStyles]}
          className="flex absolute bg-[#00ADB5] h-1/2 w-full pb-12 -bottom-[1000px] rounded-t-[44px] z-20"
        >
          <Text className="text-3xl text-white font-bold mx-auto mt-12">
            Add New Task
          </Text>

          <View className="mt-12 mx-8 flex-1">
            <Text className="text-white text-2xl font-bold text-center">
              Title
            </Text>
            <View>
              <TextInput
                className="relative bg-white w-max h-14 rounded-3xl mt-3 text-center"
                editable
                placeholder="Eg. (Breath)"
                keyboardType="default"
                value={title}
                onChangeText={(value) => setTitle(value)}
              />
            </View>
          </View>

          <View className="flex-row mx-auto pt-24 space-x-8">
            <TouchableOpacity
              className="bg-[#E56868] py-3 px-12 rounded-3xl"
              onPress={() => (offset.value = 0)}
            >
              <Text className="text-white font-bold text-xl">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white py-3 px-12 rounded-3xl"
              onPress={() => {
                if (title != "") {
                  todoRef.add({
                    title: title,
                    status: false,
                    date: new Date(),
                  });
                  offset.value = 0;
                  setTitle("");
                  getFirebaseData();
                }
              }}
            >
              <Text className="text-black font-bold text-xl">Confirm</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : null}
      {Loading ? (
        <View className="flex-row h-full items-center">
          <Progress.Circle
            size={300}
            indeterminate={true}
            color="white"
            className="mx-auto mb-48"
          />
        </View>
      ) : (
        <TaskList tasks={tasks} reloadData={getFirebaseData} />
      )}

      {!Loading ? (
        <View className="flex-row-reverse">
          <TouchableOpacity
            className="bottom-24 mr-7 bg-[#00ADB5] p-4 rounded-full border-white border-2"
            onPress={() => (offset.value = -1000)}
          >
            <FloatingAddButton />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default HomeScreen;


