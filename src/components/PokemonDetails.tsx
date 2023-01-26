import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon :PokemonFull;
}

export const PokemonDetails = ({ pokemon }:Props) => {
  return (
    <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
            ...StyleSheet.absoluteFillObject,
        }}
    >
        {/* types y peso */}
        <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
                ...styles.container,
                marginTop: 370,
            }}
        >
            <Text style={styles.title}>Types</Text>
            <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    flexDirection: 'row',
                }}
            >
                {
                    pokemon.types.map( ({type}) => (
                        <Text
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            ...styles.regularText,
                            marginRight: 10,
                        }}
                            key={type.name}
                        >
                            {type.name}
                        </Text>
                    ))
                }
            </View>

            <Text style={styles.title}>Peso</Text>
            <Text style={styles.regularText}>{pokemon.weight}kg</Text>
        </View>

        {/* Sprites */}
        <View
            style={styles.container}
        >
            <Text style={styles.title}>Sprites</Text>
        </View>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <FadeInImage
                uri={pokemon.sprites.front_default}
                style={styles.basicSprite}
            />
            <FadeInImage
                uri={pokemon.sprites.back_default}
                style={styles.basicSprite}
            />
            <FadeInImage
                uri={pokemon.sprites.front_shiny}
                style={styles.basicSprite}
            />
            <FadeInImage
                uri={pokemon.sprites.back_shiny}
                style={styles.basicSprite}
            />
        </ScrollView>

        {/* Habilidades */}
        <View
            style={styles.container}
        >
            <Text style={styles.title}>Habilidades base</Text>
            <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    flexDirection: 'row',
                }}
            >
                {
                    pokemon.abilities.map( ({ability}) => (
                        <Text
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            ...styles.regularText,
                            marginRight: 10,
                        }}
                            key={ability.name}
                        >
                            {ability.name}
                        </Text>
                    ))
                }
            </View>
        </View>

        {/* Movimientos */}
        <View
            style={styles.container}
        >
            <Text style={styles.title}>Movimients</Text>
            <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
            >
                {
                    pokemon.moves.map( ({move}) => (
                        <Text
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            ...styles.regularText,
                            marginRight: 10,
                        }}
                            key={move.name}
                        >
                            {move.name}
                        </Text>
                    ))
                }
            </View>
        </View>

        {/* Stats */}
        <View
            style={styles.container}
        >
            <Text style={styles.title}>Stats</Text>
            <View>
                {
                    pokemon.stats.map( (stat, index) => (
                        <View
                            key={stat.stat.name  + index}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <Text
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10,
                                    width: 150,
                                }}
                                key={stat.stat.name}
                            >
                                {stat.stat.name}
                            </Text>
                            <Text
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{
                                    ...styles.regularText,
                                    fontWeight: 'bold',
                                }}
                            >
                                {stat.base_stat}
                            </Text>
                        </View>
                    ))
                }
            </View>
            <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    marginBottom: 20,
                    alignItems: 'center',
                }}
            >
                <FadeInImage
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />
            </View>
        </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
    },
    regularText: {
        fontSize: 18,
    },
    basicSprite: {
        width: 100,
        height: 100,
    },
});
