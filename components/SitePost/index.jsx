import React from 'react'
import moment from 'moment'
import {RouteHandler, Link} from 'react-router'
import {prefixLink} from 'gatsby-helpers'
import access from 'safe-access'
import {config} from 'config'

import './style.scss'
import '../../static/scss/highlight.scss'

class SitePost extends React.Component {
    render() {
        const {route} = this.props
        const url = `http://blog.hatsec.io${route.path}`
        const post = route.page.data
        const isHack = route.page.requirePath.indexOf('daily-hacks') === 0;
        const home = isHack ? (
          <div>
            <Link className='gohome'
              to={prefixLink('/hacks/')}>
              Hacks
            </Link>
          </div>) : 
          (<div>
            <Link className='gohome'
              to={prefixLink('/')}>
              Home
            </Link>
          </div>
        )
        console.log('url', url);
        return (
            <div>
              {home}
              <div className='blog-single'>
                <div className='text'>
                  <h1>{post.title}</h1>
                  <div dangerouslySetInnerHTML={{__html: post.body}}/>
                  <div className='date-published blog-post-date'>
                    Published {moment(post.date).format('D MMM YYYY')}
                  </div>
                </div>
                <div className='footer'>
                  <ReadNext post={post} {...this.props}/>
                  <hr></hr>
                  <p>
                    <div className='blog-tag-line'>{config.siteDescr}</div>
                    <a href={config.siteTwitterUrl}>
                      <span className='blog-author'>{config.siteAuthor}</span> on Twitter
                    </a>
                  </p>
                </div>
              </div>
            </div>
            );
    }
}


SitePost.propTypes = {
    route: React.PropTypes.object.isRequired,
}

export default SitePost
