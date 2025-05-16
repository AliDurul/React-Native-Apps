import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    View,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { icons } from "../constants";

const zoomIn = {
    0: { scale: 0.9 },
    1: { scale: 1 }
};

const zoomOut = {
    0: { scale: 1 },
    1: { scale: 0.9 }
};

const TrendingItem = ({ activeItem, item }: any) => {
    const [play, setPlay] = useState(false);

    const player = useVideoPlayer(play ? item.video : null, player => {
        if (play) {
            player.play();
        }
    });

    // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    // Stop playing when this item is no longer active
    useEffect(() => {
        if (activeItem !== item._id && play) {
            setPlay(false);
            player?.pause();
        }
    }, [activeItem, item._id]);

    return (
        <Animatable.View
            className="mr-5"
            // @ts-ignore
            animation={activeItem === item._id ? zoomIn : zoomOut}
            duration={500}
        >
            <View className='w-52 h-80 mt-1'>
                {play ? (
                    <VideoView
                        player={player}
                        className="w-full h-full rounded-[33px] mt-3 "
                        contentFit="cover"
                        allowsFullscreen
                        allowsPictureInPicture
                        nativeControls={false}

                    />
                ) : (
                    <TouchableOpacity
                        className="relative flex justify-center items-center"
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                    >
                        <ImageBackground
                            source={{
                                uri: item.thumbnail,
                            }}
                            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
                            resizeMode="cover"
                        />

                        <Image
                            source={icons.play}
                            className="w-12 h-12 absolute"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>

        </Animatable.View>
    );
};

const Trending = ({ posts }: any) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    return (
        <FlatList
            data={posts}
            horizontal
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            // @ts-ignore
            contentOffset={{ x: 170 }}
        />
    );
};

export default Trending;
