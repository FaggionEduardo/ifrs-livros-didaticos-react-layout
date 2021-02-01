import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import BooksDetails from './EditBooksDetails';
import CreateBooks from './CreateBooksDetails';
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
// const BooksQuery = gql`
//   query BooksQuery{
//     books{
//       id
//       name
//       code
//       author
//       volume
//       quantity
//     }
//   }
// `;
const BooksDelete = gql`
  mutation BooksDelete($id:ID!){
    deleteBook(
      id:$id
    )
  }
`;
const BooksQuery = gql`
  query BooksQuery($page:Int!, $limit:Int!){
    paginateBooks(page:$page, limit:$limit) {
      docs{
        id
        name
        code
        author
        volume
        quantity
      }
      total
    }
  }
`;
const BooksEdit = gql`
  mutation BooksEdit($id:ID!, $name:String!, $code:String!,$author:String!, $volume:String!, $quantity:Int!){
    updateBook(
    id:$id
    name:$name
    code:$code
    author:$author
    volume:$volume
    quantity:$quantity
  ),{
    id
   
  }
  }
`;
const BooksCreate = gql`
  mutation BooksCreate( $name:String!, $code:String!,$author:String!, $volume:String!, $quantity:Int!){
    createBook(
    name:$name
    code:$code
    author:$author
    volume:$volume
    quantity:$quantity
  ),{
    id
   
  }
  }
`;


const BooksList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(BooksQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(BooksDelete,{
    
    refetchQueries: [
      { query: BooksQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(BooksEdit,{
    refetchQueries: [
      { query: BooksQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(BooksCreate,{
    refetchQueries: [
      { query: BooksQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  

 
  if (error) return <p>Error :(</p>;
 
 
  const defineEdit = (obj) => {
   setEdit(obj)
  };
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage+1);
  };
  const deleteBook = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editBook = (values) => {
    values.quantity=parseInt(values.quantity)
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createBook = (values) => {
    values.quantity=parseInt(values.quantity)
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Livros"
    >
      <Container maxWidth={false}>
      {edit==false && create==false?
      <>
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
                        Código
                      </TableCell>
                      <TableCell>
                        Autor
                      </TableCell>
                      <TableCell>
                        Volume
                      </TableCell>
                      <TableCell>
                        Quantidade
                      </TableCell>
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateBooks.docs.slice(0, limit).map((book) => (
                      <TableRow
                        hover
                        key={book.id}
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
                              {book.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {book.code}
                        </TableCell>
                        <TableCell>
                          {book.author}
                        </TableCell>
                        <TableCell>
                          {book.volume}
                        </TableCell>
                        <TableCell>
                          {book.quantity}
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Tem certeza que deseja deletar o livro "'+book.name+'"'}
                            title="Deletar livro"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteBook(book.id)}
                          >
                            Deletar
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(book)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateBooks.total}
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
        </>
        :
        <>
        {edit!==false?<BooksDetails edit={editBook} details={edit}/>:''}
        {create!==false?<CreateBooks create={createBook} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (BooksList);

