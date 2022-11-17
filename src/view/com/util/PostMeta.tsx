import React, {useMemo} from 'react'
import {StyleSheet, useWindowDimensions, Text, View} from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {Link} from '../util/Link'
import {PostDropdownBtn} from '../util/DropdownBtn'
import {s} from '../../lib/styles'
import {ago} from '../../lib/strings'

interface PostMetaOpts {
  itemHref: string
  itemTitle: string
  authorHref: string
  authorHandle: string
  authorDisplayName: string | undefined
  timestamp: string
  isAuthor: boolean
  onDeletePost: () => void
}

export function PostMeta(opts: PostMetaOpts) {
  const winDim = useWindowDimensions()
  const maxWidth = useMemo(
    () => ({maxWidth: ((winDim.width * 3) / 5) | 0}),
    [winDim.width],
  )
  return (
    <View style={styles.meta}>
      <Link
        style={[styles.metaItem, maxWidth]}
        href={opts.authorHref}
        title={opts.authorHandle}>
        <Text style={[s.f17, s.bold]} numberOfLines={1}>
          {opts.authorDisplayName || opts.authorHandle}
          <Text style={[s.f15, s.gray5, s.normal]} numberOfLines={1}>
            &nbsp;{opts.authorHandle}
          </Text>
        </Text>
      </Link>
      <Text style={[styles.metaItem, s.f15, s.gray5]}>
        &middot; {ago(opts.timestamp)}
      </Text>
      <View style={s.flex1} />
      <PostDropdownBtn
        style={styles.metaItem}
        itemHref={opts.itemHref}
        itemTitle={opts.itemTitle}
        isAuthor={opts.isAuthor}
        onDeletePost={opts.onDeletePost}>
        <FontAwesomeIcon icon="ellipsis-h" size={14} style={[s.mt2, s.mr5]} />
      </PostDropdownBtn>
    </View>
  )
}

const styles = StyleSheet.create({
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  metaItem: {
    paddingRight: 5,
  },
})
