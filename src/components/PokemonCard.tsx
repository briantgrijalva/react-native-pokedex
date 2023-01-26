import React, { useEffect, useState, memo } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import ImageColors from 'react-native-image-colors';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/TabList';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

const PokemonCard = ({ pokemon }:Props) => {

    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    useEffect(() => {
        ImageColors.getColors(pokemon.picture, {
            fallback: 'grey',
        }).then(colors => {

            if ( !isMounted.current ) {
                return;
            }

            if (colors.platform === 'android') {
                setBgColor(colors.dominant || 'grey');
            } else if (colors.platform === 'ios') {
                setBgColor(colors.background || 'grey');
            } else {
                setBgColor(colors.dominant || 'grey');
            }
        });

        // sucede cuando el componente es desmontado
        return () => {
            isMounted.current = false;
        };

    }, [pokemon]);

    // const getImageColors = async (uri: string) => {

    //     const colors = await ImageColors.getColors(uri, {
    //         fallback: '#228B22',
    //     });

    //     let primary;
    //     // let secondary;

    //     switch (colors.platform) {
    //         case 'android':
    //           // android result properties
    //           primary = colors.dominant;
    //         //   secondary = colors.average;
    //           break;
    //         case 'web':
    //           // web result properties
    //           primary = colors.dominant;
    //         //   secondary = colors.vibrant;
    //           break;
    //         case 'ios':
    //           // iOS result properties
    //           primary = colors.background;
    //         //   secondary = colors.secondary;
    //           break;
    //         default:
    //           throw new Error('Unexpected platform key');
    //       }

    //       setBgColor(primary!);
    //     // return [primary];
    // };

  return (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('PokemonScreen', {
            SimplePokemon: pokemon,
            color: bgColor,
        })}
    >
        <View style={{
            ...styles.cardContainer,
            width: windowWidth * 0.4,
            backgroundColor: bgColor,
        }}>
            <View>
                <Text style={styles.name}>
                   { pokemon.name }
                   { '\n#' + pokemon.id}
                </Text>
            </View>

            <View style={styles.pokebolaContainer}>
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokebola}
                />
            </View>

            <FadeInImage
                uri={pokemon.picture}
                style={styles.pokemonImage}
            />
        </View>
    </TouchableOpacity>
  );
};

export default memo(PokemonCard);

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -25,
        right: -25,
        // opacity: 0.5,
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5,
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5,
    },
});
