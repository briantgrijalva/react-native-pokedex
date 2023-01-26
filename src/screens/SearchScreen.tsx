import React, { useEffect, useState } from 'react';
import { FlatList, Platform, Text, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles as globalStyles } from '../theme/appTheme';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();
    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
    const [term, setTerm] = useState('');

    useEffect(() => {

        if (term.length === 0) {
            return setPokemonFiltered([]);
        }

        if ( isNaN(Number(term)) ) {
            setPokemonFiltered(
                simplePokemonList.filter(
                    (poke) => poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
                )
            );
        } else {
            const pokemonById = simplePokemonList.find((poke) => poke.id === term);
            setPokemonFiltered(
               (pokemonById) ? [pokemonById] : []
            );
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term]);

    if (isFetching) {
        return (
            <Loading />
        );
    }

    return (
        <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
                flex: 1,
                marginHorizontal: 20,
            }}
        >
            <SearchInput
                onDebounce ={ (value) => setTerm(value)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 30,
                }}
            />

            <FlatList
                data={pokemonFiltered}
                keyExtractor={ (pokemon) => pokemon.id }
                showsVerticalScrollIndicator={false}
                numColumns={2}
                // initialNumToRender={8}
                ListHeaderComponent={(
                    // eslint-disable-next-line react-native/no-inline-styles
                    <Text style={{
                        ...globalStyles.title,
                        ...globalStyles.globalMargin,
                        paddingBottom: 10,
                        marginTop: (Platform.OS === 'ios') ? top + 60 : top + 80,
                    }}>
                        {term}
                    </Text>
                )}
                renderItem={ ({ item }) => (
                    <PokemonCard pokemon={item}/>
                )}

            />
        </View>
    );
};

