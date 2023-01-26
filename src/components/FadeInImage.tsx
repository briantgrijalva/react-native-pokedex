import React, { useState } from 'react';
import { ActivityIndicator, Animated, ImageErrorEventData, ImageStyle, NativeSyntheticEvent, StyleProp, View } from 'react-native';
import { useAnimation } from '../hooks/useAnimation';


interface Props {
    uri: string;
    style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style = {} } : Props) => {

    const { opacity, fadeIn } = useAnimation();
    const [ isLoading, setIsLoading ] = useState( true );

    const finishLoading = () => {
        setIsLoading(false);
        fadeIn();
    };

    // eslint-disable-next-line handle-callback-err, @typescript-eslint/no-unused-vars
    const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
        setIsLoading( false );
    };

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...style as any,
        }}>

            {
                isLoading &&
                    <ActivityIndicator
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{ position: 'absolute' }}
                        color="grey"
                        size={ 30 }
                    />
            }

            <Animated.Image
                source={{ uri }}
                onError={ onError }
                onLoad={ finishLoading }
                style={{
                    ...style as any,
                    opacity,
                }}
            />

        </View>
    );
};
