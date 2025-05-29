import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center  bg-white">
      <Link href="/sign-in" className="text-blue-500 font-rubik">Go to Sign In</Link>
      <Link href="/explore" className="text-blue-500 font-rubik-bold">Go to Explore</Link>
      <Link href="/profile" className="text-blue-500 font-rubik-extrabold">Go to Profile</Link>
      <Link href="/properties/1" className="text-blue-500 font-rubik-light">Go to Property 1</Link>

      <Text className="text-red-700">Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
