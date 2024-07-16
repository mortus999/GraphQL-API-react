import { useMutation } from "@apollo/client";
import { CREATE_ALBUM } from "../mutations/Mutations";
import { FormEvent, useRef } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";

const CreateAlbumForm = () => {


  const inputTitle = useRef<HTMLInputElement>(null);
  const inputUserId = useRef<HTMLInputElement>(null);


  const [createAlbum, { data, loading, error }] = useMutation(CREATE_ALBUM);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if(inputTitle.current && inputUserId.current) {

        createAlbum({
            variables: {
                title: inputTitle.current.value,
                userId: inputUserId.current.value
            }
        })
        inputTitle.current.value = "";
        inputUserId.current.value = "";
    }

  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>ERROR</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  

  return (
    <Container>
      <h1>Create Album</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="albumTitle">
          <Form.Label>Title: </Form.Label>
          {}
          <Form.Control autoComplete="off" type="text" placeholder="Enter album title" ref={inputTitle}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="userId">
          <Form.Label>UserId: </Form.Label>
          <Form.Control autoComplete="off" type="text" placeholder="Enter user Id" ref={inputUserId}/>
        </Form.Group>

        <Button type="submit">
            Create Album
        </Button>
      </Form>
      { data && data.createAlbum && (
        <div>
            <h2>New album: {data.createAlbum.title}</h2>
            <p>Album Id: {data.createAlbum.id}</p>
            <p>User Id: {data.createAlbum.user.id}</p>
            <p>User Name: {data.createAlbum.user.name}</p>
        </div>
      )}
    </Container>
  );
};

export default CreateAlbumForm;