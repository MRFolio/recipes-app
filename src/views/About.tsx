import { BackButton } from '../components';

const About = (): JSX.Element => {
  return (
    <main className="main">
      <section style={{ margin: '1em' }}>
        <h1>About us</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero unde
          sit repudiandae itaque placeat dolores repellat officia recusandae
          voluptates neque doloremque voluptate dignissimos aut mollitia
          molestias est sed harum facere accusamus corporis ab provident,
          tempora sapiente. Laborum corrupti iure voluptates animi sunt,
          deleniti nam quae cumque, fuga praesentium consequuntur qui
          necessitatibus autem eaque ullam, quam deserunt dignissimos
          repudiandae id rerum.
        </p>
      </section>
      <BackButton />
    </main>
  );
};

export default About;
