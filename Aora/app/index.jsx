import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import 'react-native-url-polyfill/auto'

export default function App() {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full items-center justify-center min-h-[85vh] px-4'>
          <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
          <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain' />
          <View className='relative mt-5'>
            <Text className='text-4xl text-white font-bold text-center'>Discover Endless Possibilities With{' '}
              <Text className='text-secondary-200'>Aora</Text>
            </Text>
            <Image source={images.path} className='w-[136px] h-[15px] absolute -bottom-2 -right-8' resizeMode='contain' />
          </View>
          <Text className='text-base font-pregular text-gray-100 text-center mt-7'>Where creativity meets innovation: embark on a journey of limitless explorarionwith Aora</Text>
          <CustomButton title='Continue with Email' containerStyles='w-full mt-7' handlePress={()=>{router.push('/sign-in')}} />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor='#161622' />

    </SafeAreaView>
  );
}


