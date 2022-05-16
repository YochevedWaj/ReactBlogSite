using System;
using System.Text.Json.Serialization;

namespace ReactBlogSite.Data
{
    public class Comment
    {
        public int ID { get; set; }
        public string CommentatorName { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public int PostID { get; set; }
        [JsonIgnore]
        public Post Post { get; set; }
    }
}
