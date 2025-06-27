import { Box, Container } from "@mui/material";
import pagas from "../../assets/ContasPagas.png";
import apagar from "../../assets/ContasAPagar.png";
import folha from "../../assets/Folha.png";

import "./style.css";
import { grey } from "@mui/material/colors";
// import {ResponsiveAppBar} from "../../components/appBar";

export const Dashboard = () => {
  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          backgroundColor: grey[300],
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: "20px",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Box
          className="menu"
          sx={{
            transition:
              "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.3)",
              backgroundColor: "primary.dark",
            },
          }}
        >
          <img src={folha} />
        </Box>
        <Box
          className="menu"
          sx={{
            transition:
              "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.3)",
              backgroundColor: "primary.dark",
            },
          }}
        >
          <img src={pagas} />
        </Box>
        <Box
          className="menu"
          sx={{
            transition:
              "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.3)",
              backgroundColor: "primary.dark",
            },
          }}
        >
          <img src={apagar} />
        </Box>
      </Container>
    </>
  );
};
