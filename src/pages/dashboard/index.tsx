import { Box, Container } from "@mui/material";
import pagas from "../../assets/buttons/ContasPagas.png";
import apagar from "../../assets/buttons/ContasAPagar.png";
import folha from "../../assets/buttons/Folha.png";

import "./style.css";
import backgroundDefault from "../../assets/background/backgroundDefault.jpg";
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
        backgroundImage: `url(${backgroundDefault})`,
        backgroundSize: "cover",
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
            position: "relative",
            overflow: "visible",
            "& img": {
              transition: "transform 0.5s ease-in-out",
            },
            "&:hover img": {
              transform: "scale(1.3) rotate(360deg)",
              zIndex: 2,
            },
            "&:hover": {
              backgroundColor: "primary.dark",
              border: "4px solid white",
            },
          }}
        >
          <img src={folha} alt="folha" />
        </Box>

        <Box
          className="menu"
          sx={{
            transition:
              "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.3) rotate(360deg)",
              border: "4px solid white",

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
              "transform 0.3s ease-in-out, background-color 0.3s ease-in-out ",
            "&:hover": {
              transform: "translateY(-18px)",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
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
            cursor: "pointer",
          }}
          onClick={() => {
            console.log("Acessando contas a pagar");
            navigate("/aPagar");
          }}
        >
          <img src={apagar} />
        </Box>
      </Container>
    </div>
  );
};
