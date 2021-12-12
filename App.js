import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ActivityIndicator, View, FlatList, Image } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    })
    .finally(() => setLoading(false));
  }, [])

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Image style={styles.image} resizeMode="contain" source={{uri: item.image}} />
        <View style={{marginTop: 20}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={{marginTop: 15, fontSize: 12}}>{`Category: ${item.category}`}</Text>
          <Text style={{marginTop: 5}}>{`Price: $${item.price}`}</Text>
        </View>
      </View>
    )
  }

  return (
    loading ? <View style={styles.container}>
                <ActivityIndicator size="large" color="purple"/>
              </View>
            : <SafeAreaView>
                {/* <Text>This is my first time!</Text> */}
                <FlatList data={products}
                          renderItem={renderItem} 
                          keyExtractor={(item) => item.title} 
                          numColumns={2}
                          contentContainerStyle={styles.list}
                />
                <StatusBar style="auto" />
              </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    marginTop: 50,
    padding: 20
  },
  item: {
    padding: 15,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 15,
    marginRight: 10
  },
  image: {
    width: '100%',
    height: 200
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
