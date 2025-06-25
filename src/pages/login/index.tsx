import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import logo from "../../assets/icon_transparent-removebg-preview.png";
import fundo from "../../assets/fundo2.jpg";
import { useState } from "react";

export const Login = () => {
  const [moveScroll, setMoveScroll] = useState(false);

  return (
    <Box
      className="container"
      sx={{
        backgroundImage: `url(${fundo})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        className="main"
        width={"30vw"}
        height={"45vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        overflow={"hidden"}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px 0 20px 0",
          boxShadow: 20,
        }}
      >
        <Box
          className="nav"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          position={"absolute"}
          width={"90%"}
          padding={"10px 0px"}
          bottom={"20px"}
          sx={{
            backgroundImage:
              "linear-gradient(to top, #30cfd0 0%, #330867 100%);",
            borderRadius: "10px",
          }}
        >
          <Button sx={{ width: "40%", height: "100%" }} variant="contained">
            Entrar
          </Button>
          <Button sx={{ width: "40%", height: "100%" }} variant="contained">
            Cadastar
          </Button>
          <Box
            className="navScroll"
            onClick={() => setMoveScroll((prev) => !prev)}
            position="absolute"
            border="1px solid #ffffff"
            width="50%"
            alignItems={"center"}
            justifyContent={"center"}
            color={"white"}
            height="110%"
            borderRadius="13px"
            display="flex"
            flexDirection="row"
            left={moveScroll ? 0 : "50%"}
            sx={{
              backgroundImage:
                "linear-gradient(to top, #330867  0%,#30cfd0  100%);",
              transition: "1s",
            }}
          >
            <Typography textTransform={"uppercase"}>
              {moveScroll ? "Entrar" : "Cadastrar"}
            </Typography>
          </Box>
        </Box>

        <Box position={"absolute"} top={20} mb={4}>
          <Avatar src={logo} alt="Logo" sx={{ width: 250, height: 250 }} />
        </Box>

        <Box
          className="form"
          width={"100%"}
          id="formCadastro"
          padding="0 30px"
          display="flex"
          flexDirection="column"
          alignItems="end"
          position={"absolute"}
          top={275}
          left={moveScroll ? 0 : "100%"}
          sx={{ transition: "1s", gap: "16px" }}
        >
          <TextField
            fullWidth
            variant="standard"
            label="Cadastre Usuário"
            type="email"
          />
          <TextField
            fullWidth
            variant="standard"
            label="Senha"
            type="password"
          />
        </Box>

        <Box
          className="form"
          id="formLogin"
          width={"100%"}
          padding="0 30px"
          display="flex"
          flexDirection="column"
          alignItems="end"
          position={"absolute"}
          top={275}
          left={moveScroll ? "100%" : 0}
          sx={{ transition: "1s", gap: "16px" }}
        >
          <TextField
            fullWidth
            variant="standard"
            label="Acesse Usuário"
            type="email"
          />
          <TextField
            fullWidth
            variant="standard"
            label="Senha"
            type="password"
          />
        </Box>
      </Box>
    </Box>
  );
};
