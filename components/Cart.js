import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getSelectedProduct, deleteSelectedProduct } from '../actions/productActions';
import { connect } from 'react-redux';

class Cart extends Component {
    static navigationOptions = {
        title: 'Your Cart',
        titleColor: '#fff',
        headerStyle: {
            backgroundColor: '#f7c744',
            height: 60,
            elevation: null
        },
        headerTitleStyle: {
            color: '#fff',
            fontSize: 25,
            textAlign: "center",
            flex: 1,
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            inCart: []
        };
    }
    listOfNames = () => {

    }
    onPressMoreDetails = (item) => {
        var { navigate } = this.props.navigation;
        navigate("SingleScreen", { item });
    }
    _onPressDeleteItem(item) {
        var state = this.props.products.selectedProducts;
        var index = state.map(function (e) { return e.id; }).indexOf(item.id);
        state.splice(index, 1);
        this.props.deleteSelectedProduct(state);

    }
    _onPressCheckoutProducts(products) {
        var { navigate } = this.props.navigation;
        console.log('on checkout', products);
        navigate("CheckoutScreen", { products });
    }


    componentWillMount() {
        this.props.getSelectedProduct();
        console.log("this.props.products.selectedProducts", this.props.products.selectedProducts)
    }
    render() {
        const state = this.props.products.selectedProducts;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    {/* <View style={styles.titleContainer}>
                        <Text style={styles.title}>Jewellery</Text>
                    </View> */}
                    <FlatList
                        data={state}
                        extraData={this.props}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <View style={styles.listItem} onPress={() => this.onPressMoreDetails(item)}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item.images.split(",")[0] }}
                                    />
                                    <View style={styles.content}>
                                        <View style={styles.details}>
                                            <Text style={styles.adTitle}>{item.name}</Text>
                                            <Text style={styles.qty}>Qty: {item.qty} </Text>
                                            <Text style={styles.price}>VND {item.price * item.qty} </Text>
                                        </View>
                                        <View style={styles.closeBtnWrapper}>
                                            <TouchableOpacity style={styles.closeBtn} onPress={() => this._onPressDeleteItem(item)}>
                                                <Icon name="close" size={25} color="#fff" />
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <TouchableOpacity onPress={() => this._onPressCheckoutProducts(state)} style={styles.buyMeButton}>

                    <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        color: '#fff'
    },
    listItem: {
        height: 120,
        margin: 10,
        flexDirection: 'row',
    },
    image: {
        height: 80,
        width: 100,
        flex: 1,
        margin: 10
    },
    itemContainer: {
        height: 130,
        borderBottomWidth: 1,
        borderBottomColor: '#c6c6c6'
    },
    content: {
        flex: 2,
        flexDirection: 'row',
        margin: 10
    },
    details: {
        flex: 2,
    },
    closeBtnWrapper: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    closeBtn: {
        height: 50,
        width: 50,
        borderRadius: 90,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#F44336',
        justifyContent: 'center',

    },
    qty: {
        fontWeight: '400',
        fontSize: 15,
    },
    price: {
        fontWeight: '400',
        fontSize: 15,
        color: 'red'
    },
    adTitle: {
        fontWeight: '600',
        fontSize: 16,
        margin: 5
    },

    adContent: {

    },
    buttonContainer: {

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    buyMeButton: {
        backgroundColor: '#41e083',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        alignItems: 'center',
        padding: 20

    },
    buttonText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '500'
    }
})

const mapStateToProps = (state) => {
    return {
        products: state.productReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSelectedProduct: () => {
            dispatch(getSelectedProduct());
        },
        deleteSelectedProduct: (products) => {
            dispatch(deleteSelectedProduct(products));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);