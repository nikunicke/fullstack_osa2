import React from 'react'


const Header = ({ title }) => {
    return (
        <div><h1>{title}</h1></div>
    )
}


const Part = ({ part, ex }) => {
    return (
        <p><b>{part}:</b> {ex}</p>
    )
}


const Content = ({ path }) => {
    const rows = path.map(part => 
        <Part key={part.id} part={part.name} ex={part.exercises} />)

    return (
        <div>
            {rows}
            <Total path={path} />
        </div>
    )
}


const Total = ({ path }) => {
    const sum = path.map(part => part.exercises).reduce((a, b) => a + b)
    return (
        <p>Yhteensä <b>{sum}</b> tehtävää</p>
    )
}


const Courses = ({ path }) => {
    const rows = path.map(course => 
        <div key={course.id}>
            <Header title={course.name} />
            <Content path={course.parts} />
        </div>)
        
    return (
        <div>
            {rows}
        </div>
    )
}


export default Courses