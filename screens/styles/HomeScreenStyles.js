const styles = {
    allContent:{
        marginTop:20, 
        marginHorizontal:10,
        flexDirection: 'row',
        justifyContent:"center"
    },
    boxInfo:{
        flexDirection: 'column', 
        elevation: 60, 
        marginHorizontal:20,
        borderWidth:3,
        borderColor:"black", 
        backgroundColor:"#15952b", 
        width:150, 
        height:150, 
        position:"relative" 
    },
    containerInputs:{
        justifyContent: 'center',
        position:'relative',
        paddingVertical:20,
        width: 300,
        color:'black'
    },
    containerDatos:{ 
        flexDirection: 'row',
        marginVertical:10,
        justifyContent: 'center',alignItems: 'center',
        color:'black'
    },
    boxNumber:{
        flex:1, 
        justifyContent:"center"  
    },
    number:{
        fontSize:30, 
        fontWeight:500,
        textAlign:"center",
        color:"white"
    },
    input:{
        borderColor:"white",
        borderStyle:'solid',
        borderWidth: 1, 
        width: 200,
        backgroundColor:'gray',
        height:48,
        color:'black'
    }, 
    textInfo:{
        fontSize:20, 
        fontWeight:500,
        textAlign:"center",
        flex:0,
        color:"white"  
    },
    Button:{
        width:190,
        backgroundColor:'#3b5998',
        paddingVertical: 13,
        height:48,
        marginTop:6,
        paddingHorizontal: 10,
        borderRadius: 5,
        color:'black'

    },
    Button3:{
        width:190,
        backgroundColor:'#15952b',
        paddingVertical: 13,
        height:48,
        marginTop:6,
        paddingHorizontal: 10,
        borderRadius: 5,
        color:'black'

    }, 
    Button2:{
        width:60,
        backgroundColor:'#3b5998',
        paddingVertical: 1,
        position:"relative",
        top:5,
        height:22,
        paddingHorizontal: 10,
        borderRadius: 5,
        color:'black'

    }, 
};
export default styles;