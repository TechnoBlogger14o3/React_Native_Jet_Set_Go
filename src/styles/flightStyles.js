import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#f2f2f2',
        width: '95%',
    },
    flightContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#e5ebff',
        width: '100%',
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        flex: 1,
        fontWeight: 'bold',
    },
    value: {
        flex: 2,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#7b95f9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 15,
        elevation: 3, // Material design shadow
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    spinnerText: {
        color: '#000',
        fontSize: 16,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 10,
    }
});

export default styles;