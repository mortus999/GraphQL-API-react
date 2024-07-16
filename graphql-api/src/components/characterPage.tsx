import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../queries/Queries";
import { useParams } from "react-router-dom";
import {
  Alert,
  Spinner,
  Card,
} from "react-bootstrap";




interface EpisodeProps {
  name: string;
  episode: string;
}

const CharacterPage = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_CHARACTER, {
    variables: { id },
  });


  
  if (loading) {
    return <Spinner animation="border" />;
  }



  if (error) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>error!</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }



  const { name, image, episode } = data.character;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <h2>Featured Episodes: </h2>
      {episode.map(({ name, episode }: EpisodeProps) => (
        <p>
          {name} - {episode}
        </p>
      ))}
    </Card>
  );
};

export default CharacterPage;