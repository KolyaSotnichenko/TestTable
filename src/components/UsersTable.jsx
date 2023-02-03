import { useEffect, useMemo, useState } from 'react'
import ky from 'ky'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { generatePath, Link } from 'react-router-dom';
import { FormControl, MenuItem, Select } from '@mui/material';

const UsersTable = () => {

    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [genderInput, setGenderInput] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const getAllUsers = async () => {
        const fetchedUsers = await ky.get('https://gorest.co.in/public/v2/users').json()
        setUsers(fetchedUsers)
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    useEffect(() => {
      if(genderInput !== ''){
        setFilteredUsers(
          users.filter(obj => {
            return obj.gender === genderInput
          })
        )
      }
    }, [genderInput])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleInputChange = (e) => {
      setGenderInput(e.target.value)
    }

    const columns = [
        { id: 'id', label: 'ID', maxWidth: 170 },
        { id: 'name', label: 'NAME', minWidth: 170 },
        { id: 'email', label: 'EMAIL', maxWidth: 170 },
        { id: 'gender', label: 'GENDER', minWidth: 170 },
        { id: 'status', label: 'STATUS', minWidth: 170 },
    ]

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <FormControl>
        <Select
          name="gender"
          sx={{
              width: '150px'
          }}
          value={genderInput}
          onChange={handleInputChange}
        >
          <MenuItem key="male" value="male">
            Male
          </MenuItem>
          <MenuItem key="female" value="female">
            Female
          </MenuItem>
          <MenuItem key="male" value="">
            All
          </MenuItem>
        </Select>
      </FormControl>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(users && genderInput === '') ? users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell  key={column.id} align={column.align}>
                            <Link style={{textDecoration: 'none', color: 'black'}} to="/edit" state={row}>
                                {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </Link>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }) : 
                filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell  key={column.id} align={column.align}>
                              <Link style={{textDecoration: 'none', color: 'black'}} to="/edit" state={row}>
                                  {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </Link>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  )
                })
              }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default UsersTable