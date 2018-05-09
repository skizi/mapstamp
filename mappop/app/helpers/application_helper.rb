module ApplicationHelper

	# @page_titleが存在したらそちらを優先する。
	# また、個別のページで<% @page_title = Settings.hoge.meta.title %> と記述する。
	def default_meta_tags
	{
		charset: 'utf-8',
		site: Settings.site.name,
		reverse: true,
		title: @page_title || Settings.site.meta.title,
		description: @page_description || Settings.site.meta.description,
		keywords: @page_keywords || Settings.site.meta.keywords,
		canonical: Settings.site.root_url,
	    viewport: Settings.site.meta.viewport,
		og: {
			title: Settings.site.meta.og.title,
			type: Settings.site.meta.og.type,
			url: root_url,
			image: {
				_: image_url(Settings.site.meta.og.image._),
				type: Settings.site.meta.og.image.type,
				width: Settings.site.meta.og.image.width,
				height: Settings.site.meta.og.image.height
			},
			site_name: Settings.site.name,
			description: Settings.site.meta.description,
			locale: 'ja_JP',
		},
		fb: {
			app_id: Settings.site.meta.fb.app_id
		},
		twitter: {
			account_id: Settings.site.meta.twitter.account_id,
			card: Settings.site.meta.twitter.card,
			site: Settings.site.meta.twitter.site,
			title: Settings.site.meta.twitter.title,
			description: Settings.site.meta.twitter.description,
			image: image_url(Settings.site.meta.og.image._),
			domain: Settings.site.meta.twitter.domain,
			creator: Settings.site.meta.twitter.creator
		}
	}
	end

	
	def url_for_public(path)
	  return "#{ActionController::Base.relative_url_root}/#{path}"
	end
	
end
