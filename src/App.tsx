interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescripted extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartDescripted {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartDescripted {
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescripted {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartSpecial;

const Header = ({courseName}:{courseName: string}) => {
  return <h1>{courseName}</h1>
}

const Part = ({part}:{part: CoursePart}) => {
  switch(part.kind){
    case "basic":
      return(<p><strong>{part.name} {part.exerciseCount}</strong><br/><i>{part.description}</i></p>)
    case 'group':
      return(<p><strong>{part.name} {part.exerciseCount}</strong><br/>project exercises {part.groupProjectCount}</p>)
    case 'background':
      return( <p><strong>{part.name} {part.exerciseCount}</strong><br/>
              <i>{part.description}</i><br/>
              submit to {part.backroundMaterial}</p>)
    case 'special': 
      return( <p><strong>{part.name} {part.exerciseCount}</strong><br/>
              <i>{part.description}</i><br/>
              required skils: {part.requirements.toString().replace(',', ', ')}</p>)
    default: throw new Error('kind of a part does not exist')
  }
}

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return <div>{courseParts.map(p =><Part key={p.name} part={p}/>)}</div>
}

const Total = ({courseParts}: {courseParts: CoursePart[]}) => {
  return(
    <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;
