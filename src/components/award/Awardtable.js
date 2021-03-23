import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Awardtable({ award }) {
  const classes = useStyles();
  if (award.results) {
    const awards = award.results;
    return (
      <>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>순위</TableCell>
                <TableCell align="right">그림</TableCell>
                <TableCell align="right">제목</TableCell>
                <TableCell align="right">닉네임</TableCell>
                <TableCell align="right">좋아요</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {awards.map((item, index) => (
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
                  <TableCell align="right">
                    {item.username.slice(1, -1)}
                  </TableCell>
                  <TableCell align="right">{item.profiles.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  } else {
    return <></>;
  }
}
