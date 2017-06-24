import React, { Component } from 'react';
import {
    View,
    FlatList,
    Image,
    Text
} from 'react-native';
import { XmlEntities as Entities } from  'html-entities';
import moment from 'moment';

import { Badge } from 'react-native-elements';
import Header from '../components/Header';
import ArabicText from '../components/ArabicText';
import { colors } from '../config/colors';

const entities = new Entities();

class ArticlesPages extends Component {

    _keyExtractor = (item, index) => item.id;

    _renderItem({item}) {
        const imageUri = `http://s1.hespress.com/files/${item.image}`;
        console.log('imageUri', imageUri);
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: imageUri }}
                    >
                    <View style={styles.imageOverlay} />
                </Image>

                <View style={styles.textContainer}>
                    <Badge
                        containerStyle={styles.badge}>
                        <ArabicText textStyle={styles.badgeText}>{item.category_name}</ArabicText>
                    </Badge>
                    <View>
                        <ArabicText textStyle={styles.dateCreated}>{moment(item.created).fromNow()}</ArabicText>
                        <ArabicText textStyle={styles.title}>{entities.decode(item.title)}</ArabicText>
                    </View>
                </View>
            </View>
        );
    }


    render() {
        const articles = require('../assets/data/articles.json').articles;
        return (
            <View>
                <Header />
                <FlatList
                    data={articles}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    />
            </View>
        );
    }
}

const styles = {
    container: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0)',
        paddingTop: 2,
        paddingHorizontal: 2
    },
    textContainer: {
        position: 'absolute',
        top: 10,
        bottom: 30,
        right: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    title: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        lineHeight: 20,
    },
    dateCreated: {
        color: colors.white,
        fontSize: 14,
        textAlign: 'right'
    },
    badge: {
        backgroundColor: 'rgba(205, 220, 57,0.5)',
        borderRadius: 4,
        height: 30,
        padding: 6
    },
    badgeText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    image: {
        height: 250,
    },
    imageOverlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 250
    },
    bottomTextGroup: {
        top: 10
    }
};


export default ArticlesPages;
