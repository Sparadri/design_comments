json.comments do
  json.array! @full_comments do |full_comment|
    json.comment do
      json.content full_comment[:comment]
      json.user full_comment[:comment].user

      json.replies do
        json.array! full_comment[:replies] do |reply|
          json.content reply
          json.user reply.user
        end
      end
    end
  end
end
