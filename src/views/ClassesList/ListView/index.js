import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ClassesDetails from './EditClassesDetails';
import CreateClasses from './CreateClassesDetails/index';
import {ClassesQuery} from '../../../graphql/queries/class'
import {ClassCreate, ClassDelete, ClassEdit} from '../../../graphql/mutations/class'
import { useMutation,useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
import {
  Avatar,
  Box,
  Card,
  Container,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  CardHeader,
  TextField,
  Button
} from '@material-ui/core';
import { Trash2 as TrashIcon, Edit as EditIcon} from 'react-feather';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  icon:{
    margin:'0 10px',
    cursor:'pointer'
  }
}));


const ClassesList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(ClassesQuery, {
    variables: { page:page, limit:limit },
  });

  const [mutationDelete] = useMutation(ClassDelete,{
    refetchQueries: [
      { query: ClassesQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(ClassEdit,{
    refetchQueries: [
      { query: ClassesQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(ClassCreate,{
    refetchQueries: [
      { query: ClassesQuery,
       variables: { page:page, limit:limit }
       }
    ]
  }); 

  if (error) return <p>Error :(</p>;
 
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage+1);
  };

  const deleteClass = (id) => {
    mutationDelete({ variables: { id } })
  };

  const editClass = (values) => {
    values.course_id=parseInt(values.course_id)
    mutationEdit({ variables: values })
    setEdit(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Turmas"
    >
      <Container maxWidth={false}>
        <Toolbar create={setCreate} />
        <Box mt={3}>
          {loading?'':
          <Card>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Nome
                      </TableCell>
                      <TableCell>
                        Curso
                      </TableCell>
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateClasses.docs.slice(0, limit).map((classes) => (
                      <TableRow
                        hover
                        key={classes.id}
                      >
                        
                        <TableCell>
                          <Box
                            alignItems="center"
                            display="flex"
                          >
                          
                            <Typography
                              color="textPrimary"
                              variant="body1"
                            >
                              {classes.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {classes.course_id}
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Tem certeza que deseja deletar a turma "'+classes.name+'"'}
                            title="Deletar turma"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteClass(classes.id)}
                          >
                            Deletar
                          </Button>
                          </Modal>
                          
                          <Link to={"/app/classes/edit/"+classes.id} style={{color:'#263238'}}><EditIcon className={classes.icon}/></Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateClasses.total}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page-1}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage={'Itens por página:'}
            />
          </Card>
          }
        </Box>
      </Container>
    </Page>
  );
};

export default (ClassesList);

