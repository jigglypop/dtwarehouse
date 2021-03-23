import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function MyPostList({ profile }) {
  const classes = useStyles();
  const lists = profile.myposts;
  if (lists) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell align="right">그림</TableCell>
              <TableCell align="right">제목</TableCell>
              <TableCell align="right">좋아요</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {lists.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">
                  <Link to={`/${item.id}`}>
                    <img
                      src={
                        item.image_file &&
                        item.image_file.replace(
                          'http://localhost:8000/media/',
                          '/static/',
                        )
                      }
                      alt="img"
                      width="30px"
                    />
                  </Link>
                </TableCell>
                <TableCell align="right">{item.title}</TableCell>
                <TableCell align="right">{item.profiles.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <></>;
  }
}
