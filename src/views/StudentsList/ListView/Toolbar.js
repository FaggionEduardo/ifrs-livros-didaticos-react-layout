import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../components/Modal';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  CardHeader
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        
        <Modal
          color="primary"
          text="Adicionar Aluno"
        >
          <CardHeader
          subheader="Digite os dados do aluno nos campos abaixo"
          title="Adicionar Alunos"
        />
          <TextField
                fullWidth
                label="Nome"
                name="state"
                required
                variant="outlined"
                style={{margin:10}}
              ></TextField>
            <TextField
                fullWidth
                label="Email"
                name="state"
                required
                variant="outlined"
                style={{margin:10}}
              ></TextField>
              <TextField
                fullWidth
                label="Matrícula"
                name="state"
                required
                variant="outlined"
                style={{margin:10}}
              ></TextField>
              <Button
            color="primary"
            variant="contained"
            style={{margin:10}}
          >
           Salvar Aluno
          </Button>
        </Modal>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Buscar Alunos"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
