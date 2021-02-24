import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation,useQuery, gql } from '@apollo/client';
import { login as AuthLogin, useAuth } from '../../providers/Auth'
import { onError } from "@apollo/link-error";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';



const Login = gql`
  mutation Login( $login:String!, $password:String!){
    login(
    login:$login
    password:$password
  ),{
    token
    id
  }
  }
`;
const LoginView = () => {
  const {dispatch}=useAuth()
  const [values, setValues] = useState(
    {
      login:"",
      password:""
    }
  );
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  
  const [mutationLogin,{ loading: mutationLoading, error: mutationError }] = useMutation(Login,{
    onError(){
     
    } ,
    onCompleted({login}) {
        var auth=AuthLogin(login.id, login.token)
        dispatch(auth)
    }
  });
   function handleSubmit (e) {
    e.preventDefault()
     mutationLogin({ variables: { login:values.login,password:values.password }})
    
  }
  return (
    
      
          
              <form onSubmit={handleSubmit}
              
              >
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Entrar
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Entre no gerenciador de livros didáticos
                  </Typography>
                  <Typography
                    style={{color:'red'}}
                    gutterBottom
                    variant="body2"
                  >
                    {mutationError && 'Usuário ou senha incorretos'}
                  </Typography>
                  
                </Box>
               
               
                <TextField
                  fullWidth
                  label="E-mail "
                  margin="normal"
                  name="login"
                  type="email"
                  onChange={handleChange}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Senha"
                  margin="normal"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
                
              </form>
          

        
    
  );
};

export default LoginView;
