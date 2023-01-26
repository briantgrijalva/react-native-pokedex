import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigator/TabList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {

    const { SimplePokemon, color } = route.params;
    const { id, name, picture } = SimplePokemon;
    const { top } = useSafeAreaInsets();

    const { isLoading, pokemon } = usePokemon(id);

  return (
    <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
            flex: 1,
        }}
    >
        <View
            style={{
                ...styles.headerContainer,
                backgroundColor: color,
            }}
        >
            <TouchableOpacity
                onPress={ () => navigation.pop() }
                activeOpacity={0.8}
                style={{
                    ...styles.backButton,
                    top: top + 5,
                }}
            >
                <Icon
                    name="arrow-back-outline"
                    color="white"
                    size={35}
                />
            </TouchableOpacity>

            <Text
                style={{
                    ...styles.pokemonName,
                    top: top + 40,
                }}
            >
                {name + '\n'}#{id}
            </Text>

            <Image
                source={require('../assets/pokebola-blanca.png')}
                style={styles.pokeball}
            />

            <FadeInImage
                uri={picture}
                style={styles.pokemonImage}
            />
        </View>

        {
            isLoading ?
            (
                <View style={styles.loadingIndicator}>
                    <ActivityIndicator
                        color={color}
                        size={50}
                    />
                </View>
            )
            :
            ( <PokemonDetails pokemon={pokemon} /> )
        }
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex:999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20,
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7,
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
