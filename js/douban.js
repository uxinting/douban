function douban () {
	var $ = jQuery;
	var settings = {
		book: {
			isbnUrl: 'http://api.douban.com/v2/book/isbn/',
			isbnUrlSuffix: '&alt=xd&callback=?',
			keysUrl: 'http://api.douban.com/v2/book/search',
			keysUrlSuffix: '&alt=xd&callback=?',
			attributes: [
				'title', 'isbn10', 'isbn13', 'image', 'author', 'summary', 'price', 'publisher', 'author-intro'
			]
		}
	}
	
	var methods = {
		urlIsbn: function( isbn ) {
			return settings.book.isbnUrl + isbn + '?fields=' + settings.book.attributes.join( ',' ) +settings.book.isbnUrlSuffix;
		},
		
		urlKeys: function ( keys ) {
			return settings.book.keysUrl + '?q=' + keys + '&fields=' + settings.book.attributes.join( ',' ) + settings.book.keysUrlSuffix;
		},
		
		//book
		book: function( book ) {
			return book;
		},
		
		books: function( books ) {
			return books;
		}
	}
	
	this.askBookByIsbn = function ( isbn, handle ) {
		var data = {}
		$.getJSON( methods.urlIsbn( isbn ), function ( book ) {
			$.extend( data, methods.book( book ) );
			if ( typeof handle !== 'undefined') handle( data );
		});
	}
	
	this.searchBooksByKeys = function ( keys, handle ) {
		var data = {}
		$.getJSON( methods.urlKeys( keys ), function ( books ) {
			$.extend( data, methods.books( books ) );
			if ( typeof handle !== 'undefined' ) handle( data );
		});
	}
}