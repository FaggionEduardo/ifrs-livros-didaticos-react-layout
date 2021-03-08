import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';



const useStyles = makeStyles(() => ({
  root: {}
}));

const BookDetails = ({ className, create, set,...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(
    {
      name:"",
      code:"",
      author:"",
      volume:"",
      quantity:1
    }
  );
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  

  return (
    <form
      onSubmit={()=>create(values)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode cadastrar as informações de um livro."
          title="Livro"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Informe o título do livro"
                label="Título"
                name="name"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Autor"
                name="author"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Código"
                name="code"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Volume"
                name="volume"
                required
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Quantidade"
                name="quantity"
                onChange={handleChange}
                required
                type="number"
                variant="outlined"
              />
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            style={{marginRight:10,backgroundColor:"#8B0000",color:'#fff'}}
            variant="contained"
            onClick={()=>set(false)}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Cadastrar
          </Button>
        </Box>
      </Card>
    </form>
  );
};



export default BookDetails;
