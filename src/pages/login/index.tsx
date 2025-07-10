import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PersonIcon from "@mui/icons-material/Person";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import logo from "../../assets/icon_transparent-removebg-preview.png";
import hospital from "../../assets/background/hospital.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiUserService";

export const Login = () => {
  const navigate = useNavigate();
  const [moveScroll, setMoveScroll] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [errorAlertTitle, setErrorAlertTitle] = useState("");
  const [visible, setVisible] = useState(true);

  const handleVisible = () => {
    setVisible((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(username, password);

      if (!data.success) {
        setErrorAlert(data.data || "Login failed");
        setErrorAlertTitle(data.mensage || "Login failed");
        return;
      }

      sessionStorage.setItem("Token", data.data.Token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container
      sx={{
        backgroundImage: `url(${hospital})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
      maxWidth="xl"
      disableGutters
    >
      <Box
        width={"35vw"}
        height={"45vh"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          boxShadow: 20,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          position={"relative"}
          width={"99%"}
          margin={"5px"}
          padding={"5px px"}
          sx={{
            backgroundImage:
              "linear-gradient(to top, #30cfd0 0%, #330867 100%);",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              cursor: "pointer",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
            fontSize={20}
            color="#ffffff"
            onClick={() => setMoveScroll((prev) => !prev)}
          >
            Acessar
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
            fontSize={20}
            color="#ffffff"
            onClick={() => setMoveScroll((prev) => !prev)}
          >
            Cadastrar
          </Typography>

          <Box
            position="absolute"
            width="50%"
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
            borderRadius="10px"
            left={moveScroll ? "50%" : 0}
            sx={{
              backgroundImage:
                "linear-gradient(to top, #330867  0%,#30cfd0  100%);",
              transition: "1s",
            }}
          ></Box>
        </Box>

        <Avatar src={logo} alt="Logo" sx={{ width: 150, height: 150 }} />

        <Box display={"flex"} flexDirection="row" width="100%">
          <Box
            component={"form"}
            width={"100%"}
            minWidth={"100%"}
            id="formCadastro"
            padding="0 30px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              transform: moveScroll ? "translateX(100%)" : "translateX(0%)",
              opacity: moveScroll ? 0 : 1,
              transition: "1s",
              gap: "16px",
            }}
          >
            <Typography textAlign={"center"}>
              Para acessar o sistema, é necessário realizar o cadastro
              juntamente a secretaria preenchendo um formulário que pode ser
              baixado clicando em Download.
            </Typography>
            <Button
              startIcon={<CloudDownloadIcon />}
              sx={{ width: "40%", height: "100%" }}
              variant="contained"
            >
              Download
            </Button>
          </Box>

          <Box
            component={"form"}
            onSubmit={handleSubmit}
            id="formLogin"
            width={"100%"}
            minWidth={"100%"}
            padding="0 30px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              transform: moveScroll ? "translateX(-100%)" : "translateX(0%)",
              opacity: moveScroll ? 1 : 0,
              transition: "1s",
              gap: "16px",
            }}
          >
            {errorAlert && (
              <Alert
                sx={{
                  position: "absolute",
                  width: "50%",
                  marginBottom: "16px",
                  zIndex: 1,
                  textAlign: "center",
                }}
                variant="filled"
                icon={<ErrorOutlineIcon fontSize="inherit" />}
                severity="error"
                onClose={() => setErrorAlert("")}
              >
                <AlertTitle>{errorAlertTitle}</AlertTitle>
                {errorAlert}
              </Alert>
            )}
            <Box
              sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}
            >
              <IconButton>
                <PersonIcon style={{ marginRight: 8, color: "#000" }} />
              </IconButton>
              <TextField
                fullWidth
                variant="standard"
                label="Acesse Usuário"
                type="text"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}
            >
              <IconButton onClick={handleVisible}>
                {visible ? (
                  <VisibilityOffIcon
                    style={{ marginRight: 8, color: "#000" }}
                  />
                ) : (
                  <VisibilityIcon style={{ marginRight: 8, color: "#000" }} />
                )}
              </IconButton>
              <TextField
                fullWidth
                variant="standard"
                label="Senha"
                type={visible ? "password" : "text"}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Box>
            <Button
              type="submit"
              sx={{ width: "40%", height: "100%" }}
              variant="contained"
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
