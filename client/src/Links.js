import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Links extends Component {
    render() {
        //linksQuery = the name we gave it below 
        //links = this is walking into the results
        //This is the same structure you see in the query we built below

        if (this.props.linksQuery.loading) {
            return <div>Loading</div>
        }

        const data = this.props.linksQuery.links


        return (
            <div>{data.map(link => (
                <div>
                    {link.description} ({link.url})
                </div>
            ))}</div>
        )
    }
}

// Let's build a graphql query
// The first line is what we want to call in here in the client.  Technically it's not needed
// The second line is the query we want to call on the server
// The third and on is the data we're getting back with which pieces we want
const LINKS_QUERY = gql`
  query linksQuery {
      links {
        id
        url
        description
      }
  }
`

// If we wrap our component like this it will auto run the query for us
// And put the results on props
export default graphql(LINKS_QUERY, { name: 'linksQuery' })(Links)