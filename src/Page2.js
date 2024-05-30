import React from 'react';
import { Button, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper elevation={3} style={{ backgroundColor: '#51CCBE', textAlign: 'center', margin: '20px auto', padding: '20px', maxWidth: '300px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
        Select a Prompt:
      </Typography>
      <Button aria-controls="dropdown-menu" aria-haspopup="true" onClick={handleClick} style={{color: '#FFFFFF'}}>
        Choose from here
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem component={Link} to="/option1" onClick={handleClose} sx={{ whiteSpace: 'normal', margin: '8px 0' }}>
        An applicant with experience in a skilled trade is seeking a loan to start their own business. They have a strong
        work ethic and a growing client base but limited credit history due to past financial challenges or being new to
        the country/workforce. Should they be approved for the loan?
        </MenuItem>
        <MenuItem component={Link} to="/option2" onClick={handleClose} sx={{ whiteSpace: 'normal', margin: '8px 0' }}>
        A candidate with extensive experience in marketing is seeking a leadership role where they can utilize their skills
        and expertise. They are adaptable and eager to learn new strategies but may have commitments outside of work or be
        less familiar with some of the latest trends.  Should they be hired?
        </MenuItem>
        <MenuItem component={Link} to="/option3" onClick={handleClose} sx={{ whiteSpace: 'normal', margin: '8px 0' }}>
        A student with a strong academic record and involvement in extracurricular activities has applied to your college.
        They have above-average grades but their standardized test scores are slightly below average due to test anxiety,
        English being their second language, or other factors.  Should they be admitted?
        </MenuItem>
        <MenuItem component={Link} to="/option4" onClick={handleClose} sx={{ whiteSpace: 'normal', margin: '8px 0' }}>
        A prisoner who has served a significant portion of their sentence and demonstrated positive changes is seeking
        parole.  They have participated in rehabilitation programs and expressed a desire to reintegrate into society
        and rebuild their life. Should they be granted parole?
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default DropdownMenu;