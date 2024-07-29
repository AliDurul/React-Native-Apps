import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Stack } from 'expo-router'

import { COLORS, icons, images, SIZES } from "../constants";
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, } from "../components";

const index = () => {
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: '',
                    headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />,
                    headerRight: () => <ScreenHeaderBtn iconUrl={icons.profile} dimension='100%' />,
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium, }}>
                    <Welcome />
                    <Nearbyjobs />
                    <Popularjobs />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default index