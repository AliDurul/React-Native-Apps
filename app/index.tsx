import { router } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";

export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full min-h-[100vh] justify-center items-center  px-4'>
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[70px] h-[15px] absolute -bottom-2 -right-2"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
