import { useForm } from "react-hook-form";
import { Motorista } from "../types/motorista";
import { Box, Button, TextField, styled } from "@mui/material";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ChangeEvent, useState } from "react";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export const FormularioMotoristas = ({motorista, onSubmit}:{ motorista: Motorista | undefined, onSubmit: (data: Motorista) => void }) => {
    const [fileName, setFileName] = useState<string>("");
    const [imageString, setImageString] = useState<string | null>("");

    const { register, control, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            ...motorista,
        }
    });

    const { ref: nomeInputRef, ...nomeInputProps } = register("nome", {
        required: "O nome do motorista é obrigatório"
    });

    const { ref: sobrenomeInputRef, ...sobrenomeInputProps } = register("sobrenome", {
        required: "O sobrenome do motorista é obrigatório"
    });

    const { ref: emailInputRef, ...emailInputProps } = register("email", {
        required: "O email do motorista é obrigatório"
    });

    //PROFILE PHOTO LOGIC
    // const { ref: photoInputRef, ...photoInputProps} = register("imagem", 
    // {required: "A foto de perfil do motorista é obrigatória"})

    const submitWrapper = (data: any) => {
        const values = getValues();
        const motoristaAtualizado: Motorista = {
            ...data,
            imagemAvatar: "",
        };
        if(imageString){
            motoristaAtualizado.imagemAvatar = imageString;
        }
        onSubmit(motoristaAtualizado);
    }

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                if(reader.result){
                    setImageString(reader.result.toString());
                }
            },
            false,
        );
        
        reader.readAsDataURL(file);
        const { name } = file;
        setFileName(name);
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(submitWrapper)}>
                <Container>
                    <Row>
                        <Col xs={6} >
                            <TextField id="nome" label="Nome" variant="outlined"
                                {...nomeInputProps}
                                helperText={errors.nome?.message}
                                defaultValue={motorista?.nome}
                                error={errors.nome != null}
                                ref={nomeInputRef}
                                fullWidth
                            />
                        </Col>
                        <Col xs={6}>
                            <TextField id="sobrenome" label="Sobrenome" variant="outlined"
                                    {...sobrenomeInputProps}
                                    helperText={errors.sobrenome?.message}
                                    defaultValue={motorista?.sobrenome}
                                    error={errors.sobrenome != null}
                                    ref={sobrenomeInputRef}
                                    fullWidth
                            />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}>
                        <Col>
                            <TextField id="email" label="Email" variant="outlined"
                                    {...emailInputProps}
                                    helperText={errors.email?.message}
                                    defaultValue={motorista?.email}
                                    error={errors.email != null}
                                    ref={emailInputRef}
                                    fullWidth
                            />
                        </Col>
                        <Col>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                        >
                            Foto de Perfil
                            <VisuallyHiddenInput 
                                type="file" 
                                accept="image/*"
                                onChange={handleFileUpload}
                            />
                        </Button>
                        <Box>{fileName}</Box>
                        </Col>
                    </Row>
                    <Row content="">
                        <Col style={{ display: 'flex' }}>
                            <Button
                                type="submit"

                                sx={{ backgroundColor: '#1554F6', height: '48px', marginTop: '32px' }}
                                variant="contained"
                            >
                                Salvar
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </form>
        </Container>
    )

}