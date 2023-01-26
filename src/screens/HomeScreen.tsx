import React from 'react';
import { Image, FlatList, ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { styles } from '../theme/appTheme';
// import Icon from 'react-native-vector-icons/Ionicons';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();

  return (
    <>
        <Image
            source={require('../assets/pokebola.png')}
            style={styles.pokeballBG}
        />

        <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
                // ...styles.globalMargin,
                alignItems: 'center',
            }}
        >
            <FlatList
                data={simplePokemonList}
                keyExtractor={ (pokemon) => pokemon.id }
                showsVerticalScrollIndicator={false}
                numColumns={2}
                // initialNumToRender={8}
                ListHeaderComponent={(
                    // eslint-disable-next-line react-native/no-inline-styles
                    <Text style={{
                        ...styles.title,
                        ...styles.globalMargin,
                        top: top + 20,
                        marginBottom: top + 20,
                        paddingBottom: 10,
                    }}>
                        Pokedex
                    </Text>
                )}
                renderItem={ ({ item }) => (
                    <PokemonCard pokemon={item}/>
                )}
                // infinite Scroll

                onEndReached={loadPokemons}
                onEndReachedThreshold={0.4}

                ListFooterComponent={(
                    <ActivityIndicator
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{height: 100}}
                        size={20}
                        color="grey"
                    />
                )}
            />
        </View>

    </>
  );
};
