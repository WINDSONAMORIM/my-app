import { Box, Container, Typography } from "@mui/material";
import pagas from "../../assets/buttons/ContasPagas.png";
import apagar from "../../assets/buttons/ContasAPagar.png";
import folha from "../../assets/buttons/Folha.png";

import "./style.css";
// import backgroundDefault from "../../assets/background/backgroundDefault.jpg";
import backgroundDefault from "../../assets/background/iPhone 6_6S Wallpaper.jpg";
import { ResponsiveAppBar } from "../../components/appBar";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  toggleMode: () => void;
  mode: boolean;
}

export const Dashboard = ({ toggleMode, mode }: DashboardProps) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "10px",
        // backgroundImage: "linear-gradient(to top, #000428, #004e92)",
        backgroundImage: `url(${backgroundDefault})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <ResponsiveAppBar toggleMode={toggleMode} mode={mode} />
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "20px",
        }}
      >
        <Box
          className="menu"
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "visible",
            "& img": {
              transition: "transform 0.5s ease-in-out",
            },
            "&:hover img": {
              transform: "scale(1.3) ",
              opacity: 0.5,
              zIndex: 2,
            },
            "&:hover": {
              transform: "translateY(-10px)",
              transition:
                "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
              backgroundColor: "primary.dark",
              border: "4px solid white",
            },
            "& .hoverText": {
              display: "none",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              fontWeight: "bold",
            },
            "&:hover .hoverText": {
              display: "block",
              zIndex: 3,
              color: "primary.contrastText",
              fontWeight: "bold",
            },
          }}
        >
          <img src={folha} alt="folha" />
          <Typography className={"hoverText"}>RH</Typography>
        </Box>

        <Box
          className="menu"
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "visible",
            "& img": {
              transition: "transform 0.5s ease-in-out",
            },
            "&:hover img": {
              transform: "scale(1.3) ",
              opacity: 0.5,
              zIndex: 2,
            },
            "&:hover": {
              transform: "translateY(-10px)",
              transition:
                "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
              backgroundColor: "primary.dark",
              border: "4px solid white",
            },
            "& .hoverText": {
              display: "none",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              fontWeight: "bold",
            },
            "&:hover .hoverText": {
              display: "block",
              zIndex: 3,
              color: "primary.contrastText",
              fontWeight: "bold",
            },
          }}
        >
          <img src={pagas} />
          <Typography className={"hoverText"}>
            Documentos Financeiros
          </Typography>
        </Box>

        <Box
          className="menu"
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "visible",
            "& img": {
              transition: "transform 0.5s ease-in-out",
            },
            "&:hover img": {
              transform: "scale(1.3) ",
              opacity: 0.5,
              zIndex: 2,
            },
            "&:hover": {
              transform: "translateY(-10px)",
              transition:
                "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
              backgroundColor: "primary.dark",
              border: "4px solid white",
            },
            "& .hoverText": {
              display: "none",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              fontWeight: "bold",
            },
            "&:hover .hoverText": {
              display: "block",
              zIndex: 3,
              color: "primary.contrastText",
              fontWeight: "bold",
            },
          }}
        >
          <img src={pagas} />
          <Typography className={"hoverText"}>test</Typography>
        </Box>

        <Box
          className="menu"
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "visible",
            "& img": {
              transition: "transform 0.5s ease-in-out",
            },
            "&:hover img": {
              transform: "scale(1.3) ",
              opacity: 0.5,
              zIndex: 2,
            },
            "&:hover": {
              transform: "translateY(-10px)",
              transition:
                "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
              backgroundColor: "primary.dark",
              border: "4px solid white",
            },
            "& .hoverText": {
              display: "none",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              fontWeight: "bold",
            },
            "&:hover .hoverText": {
              display: "block",
              zIndex: 3,
              color: "primary.contrastText",
              fontWeight: "bold",
            },
          }}
          onClick={() => {
            console.log("Acessando contas a pagar");
            navigate("/aPagar");
          }}
        >
          <img src={apagar} />
          <Typography className={"hoverText"}>Contas a Pagar</Typography>
        </Box>
      </Container>
    </div>
  );
};
