import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Text "mo:core/Text";

actor {
  type Profile = {
    name : Text;
    title : Text;
    institution : Text;
    email : Text;
    bio : Text;
  };

  type ContactFormSubmission = {
    name : Text;
    email : Text;
    message : Text;
  };

  var profile : ?Profile = null;
  let submissions = List.empty<ContactFormSubmission>();

  public shared ({ caller }) func setProfile(name : Text, title : Text, institution : Text, email : Text, bio : Text) : async () {
    profile := ?{
      name;
      title;
      institution;
      email;
      bio;
    };
  };

  public query ({ caller }) func getProfile() : async Profile {
    switch (profile) {
      case (null) { Runtime.trap("Profile not set.") };
      case (?profile) { profile };
    };
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : ContactFormSubmission = {
      name;
      email;
      message;
    };
    submissions.add(submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactFormSubmission] {
    submissions.values().toArray();
  };
};
