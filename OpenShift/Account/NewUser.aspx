<%@ Page Title="New User" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="NewUser.aspx.cs" Inherits="Account_Register" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <h2><%: Title %></h2>
    <p class="text-danger">
        <asp:Literal runat="server" ID="ErrorMessage" />
    </p>

    <div class="form-horizontal">
        <asp:Panel ID="Panel1" GroupingText=" Personal Information" BorderWidth="2" runat="server">
            <div class="form-group">
                <asp:Label runat="server" AssociatedControlID="FirstName" CssClass="col-md-2 control-label">First Name:</asp:Label>
                <div class="col-md-10">
                    <asp:TextBox runat="server" ID="FirstName" CssClass="form-control" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="FirstName" CssClass="text-danger" ErrorMessage="First Name is required." />
                </div>
            </div>

             <div class="form-group">
                <asp:Label runat="server" AssociatedControlID="LastName" CssClass="col-md-2 control-label">Last Name:</asp:Label>
                <div class="col-md-10">
                    <asp:TextBox runat="server" ID="LastName" CssClass="form-control" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="LastName"
                        CssClass="text-danger" ErrorMessage="Last Name is required." />
                </div>
            </div>

                <div class="form-group">
                <asp:Label runat="server" AssociatedControlID="Birthday" CssClass="col-md-2 control-label">Birthday:</asp:Label>
                <div class="col-md-10">
                    <asp:TextBox runat="server" ID="Birthday" CssClass="form-control" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="Birthday"
                        CssClass="text-danger" ErrorMessage="Birthday is required." />
                </div>
            </div>

             <div class="form-group">
                <asp:Label runat="server" AssociatedControlID="Address" CssClass="col-md-2 control-label">Address:</asp:Label>
                <div class="col-md-10">
                    <asp:TextBox runat="server" ID="Address" CssClass="form-control" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="Address"
                        CssClass="text-danger" ErrorMessage="Address is required." />
                </div>
            </div>

             <div class="form-group">
                <asp:Label runat="server" AssociatedControlID="City" CssClass="col-md-2 control-label">City:</asp:Label>
                <div class="col-md-10">
                    <asp:TextBox runat="server" ID="City" CssClass="form-control" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="City"
                        CssClass="text-danger" ErrorMessage="City is required." />
                </div>
            </div>

             <div class="form-group">
                <asp:Label runat="server" AssociatedControlID="State" CssClass="col-md-2 control-label">State:</asp:Label>
                <div class="col-md-10">
                    <asp:TextBox runat="server" ID="State" CssClass="form-control" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="State"
                        CssClass="text-danger" ErrorMessage="State is required." />
                </div>
            </div>

             <div class="form-group">
                <asp:Label runat="server" AssociatedControlID="Zip" CssClass="col-md-2 control-label">Zip Code:</asp:Label>
                <div class="col-md-10">
                    <asp:TextBox runat="server" ID="Zip" CssClass="form-control" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="Zip"
                        CssClass="text-danger" ErrorMessage="Zip Code is required." />
                </div>
            </div>
        </asp:Panel>
        <br />
        <asp:Panel ID="Panel2" GroupingText=" Store Information" BorderWidth="2" runat="server">
            <div class="form-group">
                <asp:Label runat="server" AssociatedControlID="Location" CssClass="col-md-2 control-label">Store Location:</asp:Label>
                <div class="col-md-10">
                    <asp:DropDownList ID="Location" runat="server" DataSourceID="SqlDataSource3" DataTextField="strStoreName" DataValueField="intStoreID">
                    </asp:DropDownList>
                    <asp:SqlDataSource ID="SqlDataSource3" runat="server" ConnectionString="<%$ ConnectionStrings:ConnectionString %>" SelectCommand="SELECT [intStoreID], [strStoreName] FROM [TStores]"></asp:SqlDataSource>
                    <br />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="Location" CssClass="text-danger" ErrorMessage="Store Location is required." />
                </div>
            </div>

             <div class="form-group">
                <asp:Label runat="server" AssociatedControlID="EmployeeNumber" CssClass="col-md-2 control-label">Employee Number:</asp:Label>
                <div class="col-md-10">
                    <asp:TextBox runat="server" ID="EmployeeNumber" CssClass="form-control" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="EmployeeNumber"
                        CssClass="text-danger" ErrorMessage="Employee Number is required." />
                </div>
            </div>

             <div class="form-group">
                <asp:Label runat="server" AssociatedControlID="AssociateTitle" CssClass="col-md-2 control-label">Associate Title:</asp:Label>
                <div class="col-md-10">
                    <asp:DropDownList ID="AssociateTitle" runat="server" DataSourceID="SqlDataSource2" DataTextField="strAssociateTitle" DataValueField="intAssociateTitleID">
                    </asp:DropDownList>
                    <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:ConnectionString %>" SelectCommand="SELECT * FROM [TAssociateTitles]"></asp:SqlDataSource>
                    <br />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="AssociateTitle"
                        CssClass="text-danger" ErrorMessage="Associate Title is required." />
                </div>
            </div>
        </asp:Panel>
        <br />
         <asp:Panel ID="Panel3" GroupingText=" Contact Information" BorderWidth="2" runat="server">
         <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="PhoneNumber" CssClass="col-md-2 control-label">Phone Number:</asp:Label>
            <div class="col-md-10">
                <asp:TextBox runat="server" ID="PhoneNumber" CssClass="form-control" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="PhoneNumber"
                    CssClass="text-danger" ErrorMessage="Phone Number is required." />
            </div>
        </div>

        <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="EmailAddress" CssClass="col-md-2 control-label">Email Address:</asp:Label>
            <div class="col-md-10">
                <asp:TextBox runat="server" ID="EmailAddress" CssClass="form-control" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="EmailAddress"
                    CssClass="text-danger" ErrorMessage="Email Address is required." />
            </div>
        </div>

        <div class="form-group">
        <asp:Label runat="server" AssociatedControlID="ConfirmEmailAddress" CssClass="col-md-2 control-label">Confirm Email:</asp:Label>
            <div class="col-md-10">
                <asp:TextBox runat="server" ID="ConfirmEmailAddress" CssClass="form-control" />
                <asp:CompareValidator runat="server" ControlToCompare="EmailAddress" ControlToValidate="ConfirmEmailAddress"
                    CssClass="text-danger" Display="Dynamic" ErrorMessage="The email and confirmation email inputs do not match." />
            </div>
        </div>
        </asp:Panel>
        <br />
          <asp:Panel ID="Panel4" GroupingText=" Credential Setup" BorderWidth="2" runat="server">
         <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="Password" CssClass="col-md-2 control-label">Password</asp:Label>
            <div class="col-md-10">
                <asp:TextBox runat="server" ID="Password" TextMode="Password" CssClass="form-control" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="Password"
                    CssClass="text-danger" ErrorMessage="The password field is required." />
            </div>
        </div>
        <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="ConfirmPassword" CssClass="col-md-2 control-label">Confirm password</asp:Label>
            <div class="col-md-10">
                <asp:TextBox runat="server" ID="ConfirmPassword" TextMode="Password" CssClass="form-control" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="ConfirmPassword"
                    CssClass="text-danger" Display="Dynamic" ErrorMessage="The confirm password field is required." />
                <asp:CompareValidator runat="server" ControlToCompare="Password" ControlToValidate="ConfirmPassword"
                    CssClass="text-danger" Display="Dynamic" ErrorMessage="The password and confirmation password do not match." />
            </div>
        </div>
        </asp:Panel>

        <br />
          <asp:Panel ID="Panel5" GroupingText=" Notifications" BorderWidth="2" runat="server">
              <asp:CheckBox ID="chkEmail" runat="server" /><asp:Label ID="lblEmail" runat="server">Receive Email Notifications</asp:Label>
              <br />
              <asp:CheckBox ID="chkText" runat="server" /><asp:Label ID="lblText" runat="server">Receive Text Notifications</asp:Label>
        </asp:Panel>
        <br />
        <asp:ValidationSummary runat="server" CssClass="text-danger" />
        <div class="form-group">
            <div class="col-md-offset-2 col-md-10" style="left: 0px; top: 0px">
                <asp:Button runat="server" OnClick="CreateUser_Click" Text="Register" CssClass="btn btn-default" />
                <asp:Button runat="server" OnClick="Clear_Click" Text="Clear"  CssClass="btn btn-default" />
                <asp:Button runat="server" OnClick="Cancel_Click" Text="Cancel" CssClass="btn btn-default" />
            </div>
        </div>
    </div>
    <asp:Label ID="Label1" runat="server" Text=""></asp:Label>
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:ConnectionString %>" SelectCommand="SELECT * FROM [TAssociates]"></asp:SqlDataSource>
</asp:Content>

