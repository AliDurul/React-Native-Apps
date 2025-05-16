import React from 'react'
import { Tabs } from 'expo-router'
import { Image, ImageBackground, Text, View } from 'react-native'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const TabIcon = ({ focused, icon, title }: any) => {

  if (!focused) {
    return (
      <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image source={icon} tintColor="#A8B5DB" className='size-5'></Image>
      </View>
    )
  }

  return (
    <ImageBackground source={images.highlight} className='flex flex-row w-full flex-1 min-w-[115px] min-h-16 mt-4 justify-center gap-1 items-center rounded-full overflow-hidden' >
      <Image source={icon} tintColor='#151312' className='size-5' />
      <Text className='text-secondary text-base font-semibold '>{title}</Text>
    </ImageBackground>
  )
}

export default function _Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor:'#030014',
          // borderRadius: 50,
          // marginHorizontal: 20,
          // marginBottom: 36,
          height: 52,
          // borderTopWidth: 0,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f0D23'
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          )
        }}
      />

      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          )
        }} />

      <Tabs.Screen
        name='saved'
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Saved" />
          )
        }} />

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          )
        }} />
    </Tabs>
  )
}