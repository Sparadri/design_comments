json.comments do
  json.array! @comments do |comment|
    json.comment comment
    json.user comment.user
  end
end
