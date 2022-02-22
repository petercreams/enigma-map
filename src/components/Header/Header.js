import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import MapIcon from "@mui/icons-material/Map";
import { spacing } from "@mui/system";

const Header = () => {
  return (
    <div>
      <AppBar position="static" style={{ zIndex: 1000 }}>
        <Toolbar>
          <MapIcon />
          <Typography variant="h5">Enigma Map</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
