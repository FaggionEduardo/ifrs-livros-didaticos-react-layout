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

const BookDetails = ({ className, details,edit,set, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(details);
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  

  return (
    <form
      onSubmit={()=>edit(values)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode editar as informações do livro."
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
                value={values.name}
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
                value={values.author}
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
                value={values.code}
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
                value={values.volume}
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
                value={values.quantity}
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
            Editar
          </Button>
        </Box>
      </Card>
    </form>
  );
};



export default BookDetails;
